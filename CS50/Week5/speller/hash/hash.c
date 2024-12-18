#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include <cs50.h>

int main (void)
{

    int hashnum;
    char word[2];
    word[0] = get_char("word[0]:\n");
    word[1] = get_char("word[1]:\n");

    int letter0 = (toupper(word[0]) - 65) * 26;

    if (word[1] == '\0')
    {
        hashnum = letter0;
    }

    else
    {
        int letter1 = toupper(word[1]) - 64;
        hashnum = letter0 + letter1;
    }

    printf("hashnum: %i\n", hashnum);
}