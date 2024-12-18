#include <cs50.h>
#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool only_digits(string s);

char rotate(char c, int i);

int main(int argc, string argv[])
{
    if (argc != 2 || !only_digits(argv[1]))
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    int key = atoi(argv[1]);
    string ptext = get_string("plaintext: ");

    printf("ciphertext: ");

    for (int i = 0, l = strlen(ptext); i < l; i++)
    {
        printf("%c", rotate(ptext[i], key));
    }

    printf("\n");

}

bool only_digits(string s)
{
    for (int i = 0, l = strlen(s); i < l; i++)
        {
            if  (isdigit(s[i]))
                {
                    continue;
                }
            else
                {
                return false;
                }
        }
    return true;
}

char rotate(char c, int i)
    {
        if (!isalpha(c))
        {
            return c;
        }

        int ascii;
        if (isupper(c)) {
            ascii = 65;
        } else {
            ascii = 97;
        }

        int old = c - ascii;
        int new = (old + i) % 26;
        return (char)new + ascii;

        // A == 65 / 0
        // Z == 90 / 25
        // D == 68 / 3

        // a == 97 / 0
        // z == 122 / 25
        // d == 100 / 0

        // c == 'A', i == 25, x == 'Z'
        // c == 'A', i == 26, x == 'A'
        // c == 'A', i == 27, x == 'B'

    }