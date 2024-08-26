import psycopg2
from psycopg2 import sql
import re
# Database connection parameters
db_params = {
    # 'dbname': '',
    # 'user': 'postgres',
    # 'password': '',
    # 'host': 'localhost',
    # 'port': '5432'
}
file_path = "bible.txt"
# Path to your Bible verses file
def parse_reference(reference):
    match = re.match(r'((?:\d\s)?[A-Za-z\s]+)\s(\d+):(\d+)', reference)
    if match:
        book_name, chapter, verse = match.groups()
        return book_name.strip(), int(chapter), int(verse)
    else:
        raise ValueError(f"Unable to parse reference: {reference}")

try:
    conn = psycopg2.connect(**db_params)
    cur = conn.cursor()

    # Fetch all book names from the database
    cur.execute("SELECT name FROM api_book")
    db_book_names = set(row[0] for row in cur.fetchall())
    print("Books in database:", db_book_names)

    with open(file_path, 'r') as file:
        for line_num, line in enumerate(file, 1):
            reference, text = line.strip().split('\t')
            try:
                book_name, chapter, verse = parse_reference(reference)
                print(f"Line {line_num}: Parsed '{reference}' as Book: '{book_name}', Chapter: {chapter}, Verse: {verse}")
            except ValueError as e:
                print(f"Line {line_num}: Parsing error: {e}")
                continue

            if book_name not in db_book_names:
                print(f"Line {line_num}: Book '{book_name}' not found in database. Skipping.")
                continue

            # Insert into api_verse table
            cur.execute(
                sql.SQL("""
                INSERT INTO api_verse (verse_number, text, chapter_id)
                VALUES (%s, %s, (
                    SELECT c.id
                    FROM api_chapter c
                    JOIN api_book b ON c.book_id = b.id
                    WHERE b.name = %s AND c.chapter_number = %s
                ))
                """),
                (verse, text, book_name, chapter)
            )

    # Commit the changes
    conn.commit()
    print("Bible verses inserted successfully!")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL or inserting data:", error)

finally:
    if conn:
        cur.close()
        conn.close()
        print("PostgreSQL connection is closed")