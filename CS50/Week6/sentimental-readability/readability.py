from cs50 import get_string
import re

text = get_string("Text: ")

l = sum(c.isalpha() for c in text)
print(f"letters: {l}")

w = len(text.split())
print(f"Words: {w}")

s = len(re.split("[.!?]", text)) - 1
print(f"sentences: {s}")

L = l / (w * 0.01)
S = s / (w * 0.01)
g = 0.0588 * L - 0.296 * S - 15.8
g = round(g)

if g >= 16:
    print("Grade 16+")

elif g < 1:
    print("Before Grade 1\n")

else:
    print(f"Grade {g}" )
