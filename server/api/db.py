from flask import current_app, g
from psycopg2 import connect
from datetime import datetime
import hashlib

def get_db():
    if 'db' not in g:
        DATABASE_URL = current_app.config['DATABASE_URL']
        # g.db = connect(DATABASE_URL, sslmode='require')
        g.db = connect(DATABASE_URL)
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.authenticated = True

    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False

def hash_password(password):
    return hashlib.sha3_512(password.encode()).hexdigest()

def get_admins():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT username FROM admins")
    admins = cur.fetchall()
    cur.close()
    return list(admins)

def get_admin(username):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT username, password FROM admins WHERE username=%s", (username,))
    user = cur.fetchone()
    cur.close()
    if user:
        return User(user[0], user[1])
    return None

def auth(username, password):
    user = get_admin(username)
    if user:
        if user.password == hash_password(password):
            return user
    return None

# def add_admin(username, password):
#     user = get_admin(username)
#     if user is None:
#         db = get_db()
#         cur = db.cursor()
#         password = hash_password(password)
#         cur.execute("INSERT INTO admins (username, password) VALUES (%s, %s)", (username, password))
#         db.commit()
#         cur.close()
#         return User(username, password)
#     return None

def get_tiles():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT c.id, c.title, s.name, c.status FROM complaints c, students s WHERE c.author = s.rollno ORDER BY c.priority DESC, c.date DESC")
    tiles = [{'id': id, 'title': title, 'author': author, 'status': status} for id, title, author, status in cur.fetchall()]
    cur.execute("SELECT tag FROM tags")
    tags = list(cur.fetchall())
    cur.close()
    return {'tiles': tiles, 'tags': tags}

def get_tiles_by_tag(tag):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT id FROM tags WHERE tag=%s", (tag,))
    tid = cur.fetchone()
    cur.execute("SELECT c.id, c.title, s.name, c.status FROM complaints c, students s WHERE c.author = s.rollno AND c.id in (SELECT cid FROM tags_complaints WHERE tid = %s) ORDER BY c.priority DESC, c.date DESC", (tid[0],))
    tiles = [{'id': id, 'title': title, 'author': author, 'status': status} for id, title, author, status in cur.fetchall()]
    cur.close()
    return {'tiles': tiles}

def get_complaint_details(cid):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT c.title, c.date, c.description, s.name, c.status, c.assignee, c.votes, c.priority, c.eta FROM complaints c, students s WHERE c.id = %s AND c.author = s.rollno", (cid,))
    title, date, description, author, status, assignee, votes, priority, eta = cur.fetchone()
    complaint = {'title': title, 'date': date, 'description': description, 'author': author, 'status': status, 'assignee': assignee, 'votes': votes, 'priority': priority, 'eta': eta}
    cur.execute("SELECT * from comments WHERE cid=%s", (cid,))
    comments = [{'id': id, 'cid': cid, 'date': date, 'comment': comment, 'author': author} for id, cid, date, comment, author in cur.fetchall()]
    cur.execute("SELECT t.tag FROM tags t, tags_complaints tc WHERE tc.cid = %s AND t.id = tc.tid", (cid,))
    tags = list(cur.fetchall())
    cur.close()
    return {'complaint': complaint, 'comments': comments, 'tags': tags}

def vote(cid):
    db = get_db()
    cur = db.cursor()
    cur.execute("UPDATE complaints SET votes = votes + 1 WHERE id = %s", (cid,))
    db.commit()
    cur.close()

def add_comment(cid, comment, author):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM admins WHERE username=%s",  (author,))
    if cur.fetchone():
        cur.execute("INSERT INTO comments (cid, date, comment, author) VALUES (%s, %s, %s, %s)", (cid, datetime.now(), comment, author))
    else:
        cur.execute("SELECT name FROM students WHERE rollno=%s", (author,))
        name = cur.fetchone()
        cur.execute("INSERT INTO comments (cid, date, comment, author) VALUES (%s, %s, %s, %s)", (cid, datetime.now(), comment, name[0]))
    db.commit()
    cur.close()

def new_complaint(form):
    db = get_db()
    cur = db.cursor()
    cur.execute("INSERT INTO complaints (title, date, description, author, priority) VALUES (%s, %s, %s, %s, %s) RETURNING id", (form['title'], datetime.now(), form['description'], form['author'], form['priority']))
    cid = cur.fetchone()[0]
    cur.execute("SELECT id FROM tags WHERE tag IN %s", (tuple(form['tags']),))
    tagid = cur.fetchall()
    cur.executemany("INSERT INTO tags_complaints(cid, tid) VALUES (%s, %s)", [(cid, tid) for tid in tagid])
    db.commit()
    cur.close()

def edit_complaint(cid, form):
    db = get_db()
    cur = db.cursor()
    cur.execute("UPDATE complaints SET assignee=%s priority = %s, status=%s, eta=%s WHERE id = %s", (form['assignee'], form['priority'], form['status'], form['eta'], cid))
    db.commit()
    cur.close()