def convert_to_roman(book_name):
    if book_name.startswith('1'):
        return 'I' + book_name[2:]
    elif book_name.startswith('2'):
        return 'II' + book_name[2:]
    elif book_name.startswith('3'):
        return 'III' + book_name[2:]
    else:
        return book_name

# Path to your input Bible verses file
input_file_path = 'bible.txt'

# Path to your output Bible verses file
output_file_path = 'bibleNew.txt'

try:
    with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
        for line in input_file:
            # Split the line into reference and text
            reference, text = line.strip().split('\t', 1)
            
            # Split the reference into book name and chapter:verse
            parts = reference.split(' ', 1)
            if len(parts) > 1:
                book_name, chapter_verse = parts
                # Convert the book name
                converted_book_name = convert_to_roman(book_name)
                # Reconstruct the reference
                new_reference = f"{converted_book_name} {chapter_verse}"
            else:
                # If there's no space in the reference, just use it as is
                new_reference = reference
            
            # Write the converted line to the output file
            output_file.write(f"{new_reference}\t{text}\n")

    print("Conversion completed successfully!")

except Exception as error:
    print("An error occurred:", str(error))