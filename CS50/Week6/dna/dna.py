import csv
import sys


def main():

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        sys.exit("No filename in command line")

    # TODO: Read database file into a variable
    dreader = open(sys.argv[1], "r")
    dbase = csv.DictReader(dreader)

    # TODO: Read DNA sequence file into a variable
    sreader = open(sys.argv[2], "r")
    dnaseq = sreader.read()

    # TODO: Find longest match of each STR in DNA sequence
    strheader = dbase.fieldnames #Returns the dictionary fieldnames as a list
    strdict = {'name': 'question'}
    c = 1
    while c < (len(strheader)):
        subsequence = strheader[c]
        match =  longest_match(dnaseq, subsequence)
        strdict[strheader[c]] = str(match) #adds an element to strdict (eg. 'AGATC' = '12')
        c += 1
    #print(strdict)

    # TODO: Check database for matching profiles
    for row in dbase:
        #print(row)
        ismatch = ismatchf(row, strdict)
        if ismatch == True:
            print(f"{row.get('name')}")
            sys.exit

    print("No match")
    sys.exit


def ismatchf(dict1, dict2): #Did this
    comp_keys = ['AGATC', 'TTTTTTCT', 'AATG', 'TCTAG', 'GATA', 'TATC', 'GAAA', 'TCTG'] #keys to compare
    istrue = all(dict1.get(key) == dict2.get(key) for key in comp_keys) #if all is true || get returns the value of a specific key
    return istrue

def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
