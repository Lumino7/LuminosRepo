#include <cs50.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <math.h>


int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void)
{

//Get user input
    string text = get_string("Text: ");

//Compute number of letters
    int l = count_letters(text);


//Compute number of words
    int w = count_words(text);


//Compute number of sentences
    int s = count_sentences(text);


//Compute grade
    float L = l / (w * 0.01);
    float S = s / (w * 0.01);
    float g = 0.0588 * L - 0.296 * S - 15.8;
    g = round(g);
    if(g >= 16)
        {
            printf("Grade 16+\n");
        }
    else if (g < 1)
        {
            printf("Before Grade 1\n");
        }
    else
        {
            printf("Grade %.f\n", g);
        }
}

int count_letters(string text)
{
    //
    int l = 0;
    for (int i = 0, len = strlen(text); i < len; i++)
    {
        if (isalpha (text[i]))
            l++;
    }

    return l;
}

int count_words(string text)
{
    int w = 0;




    for (int i = 0, len = strlen(text); i < len; i++)
    {

            // printf("character: %c\n", text[i]);
            // printf("isspace: %s\n", isspace(text[i]) ? "true" : "false");
            // printf("isalpha: %s\n", isalpha(text[i - 1]) ? "true" : "false");
            // printf("\n");

        if (isspace(text[i]) && isalpha(text[i - 1]))
        {
            w++;
        }
    }

    printf("Words: %i\n", w + 1);

    return w + 1;
}

int count_sentences(string text)
{
    int s = 0;

    for (int i = 0, len = strlen(text); i < len; i++)
    {
        if (text[i] == 46 || text[i] == 33 || text[i] == 63)
            s++;
    }

    return s;
}