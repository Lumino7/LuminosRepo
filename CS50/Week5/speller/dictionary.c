// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <strings.h>
#include "dictionary.h"
#include <stdlib.h>

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 677;

// Hash table
node *table[N]; // an array where each element is a pointer to a node -bry

// TODO Returns true if word is in dictionary, else false
bool check(const char *word)

{
    int hashnum = hash(word);

    node *tmp = table[hashnum];
    while (tmp != NULL)
    {
        if (strcasecmp(tmp->word, word) == 0)
        {
            return true;
        }

        tmp = tmp->next;
    }
    // for (node *tmp = table[hashnum]; tmp != NULL; tmp = tmp->next)
    //{
    //     if (strcasecmp(tmp->word, word) == 0)
    //     {
    //         return true;
    //     }
    //
    //    else
    //    {
    //        continue;
    //    }
    //}

    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    int hashnum;
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

    return hashnum;
}

// Loads dictionary into memory (hash table), returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO

    // open dictionary file
    FILE *dict = fopen(dictionary, "r");

    if (dict == NULL)
    {
        return false;
    }

    // read strings from file
    char buffer[LENGTH + 1];
    while (fscanf(dict, "%s", buffer) != EOF) // scanf returns EOF at end of file
    {
        // fscanf(dict, "%s", buffer);

        // create a new node
        node *n = malloc(sizeof(node));
        if (n == NULL)
        {
            return false;
        }

        strcpy(n->word, buffer);
        n->next = NULL;

        // hash word using hash function
        int hashnum = hash(n->word);

        // insert node into hash table
        //  if (table[hashnum] == NULL)
        //  {
        //      table[hashnum] = n;
        //  }
        //  else
        //  {
        n->next = table[hashnum];
        table[hashnum] = n;
        //}
        // printf("%s\n", buffer);
    }

    fclose(dict);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    int wordcount = 0;

    for (int i = 0; i < N; i++)
    {
        for (node *tmp = table[i]; tmp != NULL; tmp = tmp->next)
        {
            wordcount++;
        }
    }
    return wordcount;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for (int i = 0; i < N; i++)
    {
        node *trav = table[i];
        while (trav != NULL)
        {
            node *tmp = trav->next;
            free(trav);
            trav = tmp;
        }
    }
    return true;
}
