I'mII'I'mII'I'mII'I'mII'II'mII'I'mII'I'mII'I'mII'I
I


h = 0
i = 0
j = 0
k = 0

while h < 1 or h > 8:
    h = cs50.get_int("Height: ")

while i < h:
    while j < h - i - 1:
        print(' ', end="")
        j += 1
    while k <= i:
        print("#", end="")
        k += 1

    print("\n", end="")
    i += 1
    j = 0
    k = 0