# Virtual Complaint Box

## Statement

## Description

## Instructions

### Postgres Database

1. Create and set up a postgres database named `complaints`

    ```console
    $   createdb complaints
    $   psql -d complaints -a -f db.sql

### Python Backend

1. Create and activate a virtual environment in [path]

    ```console
    $   python3 -m venv [path]
    $   source [path]/bin/activate
    ```

2. Install the dependencies

   ```console
   $    pip install -r requirements.txt
   ```

3. Start the flask server

   ```console
   $    python app.py
   ```

### React Frontend

1. Install the dependencies

    ```console
    $   npm install
    ```

2. Start the react server

    ```console
    $   npm start
    ```

## Screenshots

## Frequently Asked Questions (FAQ)

1. What is the purpose of this project?
   To provide a hassle-free way for students to register hostel related complaints.
2. What do the colors on the tiles mean?
   The colors indicate the severity of the complaint. Green indicates a minor complaint, orange indicates a major complaint, and red indicates a critical complaint.
3. How are the tiles sorted?
   
4. Can Admins alter the complaints?
   

## Next Steps

1. Make the UI responsive.
2. Implement a mobile-optimized UI.
3. Implement a comments system on complaints.
