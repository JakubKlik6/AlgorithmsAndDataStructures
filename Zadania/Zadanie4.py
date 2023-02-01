"""
Napisać funkcję sprawdzającą poprawność domknięcia bloków, otwieranych i zamykanych różnymi znakami:
cytatu/cudzysłowu przecinkowego - znaki „ ”,
cytatu/cudzysłowu szeryfowego - znaki » «,
nawiasu okrągłego - znaki ( )
Po zakończeniu przeglądania napisu należy sprawdzić, czy wszystkie bloki zostały domknięte i jeśli nie, to stwierdzić błąd i poinformować o rodzaju niedomkniętych bloków.
Do realizacji zadania należy wykorzystać stos (wystarczy jeden), pomocniczo można też skorzystać ze słownika/słowników.
"""


def check_blocks(string):
    opening_chars = ['(', '"', '»']
    closing_chars = [')', '"', '«']
    char_map = {'(': ')', '"': '"', '»': '«'}
    stack = []

    for char in string:
        if char in opening_chars:
            stack.append(char)
        elif char in closing_chars:
            if not stack:
                return "Error: Unexpected closing character '{}'".format(char)
            if char_map[stack[-1]] != char:
                return "Error: Mismatched characters '{}' and '{}'".format(stack[-1], char)
            stack.pop()

    if stack:
        return "Error: Unclosed blocks for characters: {}".format(", ".join(stack))

    return "String is well-formed."
