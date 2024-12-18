# Has no command for declaring variables. No let/var. It is declared when it is defined.

# unpacking
fruits = ["apple", "banana", "cherry"]
x, y, z = fruits

# updating a global variable inside a function:
counter = 5 # Global variable
def increment():
    global counter
    counter += 1
print(f"{counter}") #result: 5
increment()
print(f"{counter}") #result: 6

# typecasting
datatype(object)
a = int("10")  # Output: 10



# Multiline strings in triple quotes. Can also be triple single quotes.
multiline_string = """This is a multiline string.
It spans multiple lines.
Each line is separated by a newline character."""

# Adding strings and numbers is not allowed. Use fstrings.

# Range syntax
my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
sub_list = my_list[2:5]
print(sub_list)  # Output: [2, 3, 4]

# f strings
f"Hello{x}" # x can be not only variables but a variety of Python expressions.

# \ escape character same with JS

# has a lot more operators than JS, such as is, in.

# is checks whether two references point to the same object in memory. === in js.
a = [1, 2, 3]
b = a
print(a is b)  # Output: True

a = None
print(a is None)  # Output: True. Comparing with None is a common use case for the is operator, as None is a singleton in Python.

if x in list
# Checks if an item is in an iterable.
# JS also has this.

# In both JS and Py, non-primitive types such as objects and arrays are assigned by reference. When you assign an object or array to a variable, you're actually assigning a reference to the memory location where the object or array is stored. Changing it through one variable affects all variables that reference it.

# logical operators
and = and, && in JS
or = or, || in JS
not = not ! in JS

# List comprehension
newlist = [expression for item in iterable if condition == True]
# ex:
newlist = [x for x in fruits if x != "apple"]
newlist = [x.upper() for x in fruits if x != "apple"]
# expression is what you want each item to be.
# the if statement is optional.

# Ternary statements
variablename = value1 if condition else value2


# break = jumps out of a loop.
# continue = skips 1 iteration of a loop.
# These are the same in JS.

# * unpacking operator
arr1 = [1, 2, 3]
arr2 = [*arr1, 4, 5, 6]
print(arr2)  # Output: [1, 2, 3, 4, 5, 6]

# ** for dicts
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
combined_dict = {**dict1, **dict2}
print(combined_dict)  # Output: {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# *args and **kwargs allows a function to treat an indefinite number of arguments as an array. (...args) in JS.
def print_user_info(**kwargs): #**kwargs to handle dictionaries.
    for key, value in kwargs.items():
        print(f"{key}: {value}")
# Calling the function with different keyword arguments
print_user_info(name="Alice", age=30, city="New York")
print_user_info(name="Bob", profession="Developer")
"""
result:
name: Alice
age: 30
city: New York
name: Bob
profession: Developer
"""

# lambda functions
add = lambda a, b: a + b # Can only have 1 expression. Arrow functions in JS

# Use pass for empty code blocks, for ex empty functions, classes, conditionals. You can do empty code blocks in JS.

# try except raise else finally
    class CustomError(Exception):
        pass

    def process_data(data):
        try: # Code that might throw an exception
            if not data:
                raise CustomError('No data provided')  # raise makes a custom Exception object
            print(f'Data is: {data}')
        except CustomError as error:
            # Code executed if an error occurs in the try block
            print(f'Error: {error}')  # Handles the error
        else:
            # Code that runs if no exception occurs in the try block
            print('Data processed successfully.')  # This will only run if the try block is successful
        finally:
            # Code that always runs, regardless of success or failure
            print('Execution completed.')

    # Test with no data
    process_data(None)
    # Output:
    # Error: No data provided
    # Execution completed.


_______________________________
_______________________________


# PYTHON DATA STRUCTURES

# In Python, there are several built-in data structures available for organizing and manipulating data. Here are some commonly used types of data structures in Python:
# All structures can have different data types.

# 1. Lists
# Indexed, Ordered, Mutable, Duplicates

my_list = [1, 'hello', 3.14, True]

________________________________

#2. Tuples
# Indexed, Ordered, Immutable, Duplicates
# Immutability: Once a tuple is created, you cannot modify its elements, add new elements, or remove existing ones.
# Basically lists that are immutable.
# They are typically used for grouping related data together. If you want to change it's contents, convert it into a list, make the changes, then convert it back to tuple.

my_tuple = (1, 'hello', 3.14, True)

#example usage:
def get_user_info(user_id):
    # Example data
    user_name = "Alice"
    user_age = 30
    user_email = "alice@example.com"

    # Return multiple values as a tuple
    return user_name, user_age, user_email
# Calling the function and unpacking the tuple
name, age, email = get_user_info(1)
print(name)   # Output: Alice
print(age)    # Output: 30
print(email)  # Output: alice@example.com

_________________________________

# 3. Sets
# Unindexed, Unordered, Mutable, No Duplicates
# They are useful for storing and manipulating distinct values, and they support set operations like union, intersection, and difference.
# Convert an iterable to a set using typecasting to remove duplicates.

my_set = {1, 'hello', 3.14, True}

_______________________________

# 4. Frozensets
# Sets that are Immutable

iterable = my_set
my_frozenset = frozenset(iterable) #typecast any iterable
try:
    my_frozenset.add(4)
except AttributeError as e:
    print(e)  # Output: 'frozenset' object has no attribute 'add'


_________________________________


# 5. Dictionaries
#Comma-separated Key-value pairs, Ordered, Mutable, No Duplicates, Values can be Different Data Types.

my_dict = {'name': 'John', 'age': 25, 'city': 'New York'}

________________________________

# 6. Strings
# sequences of characters, have built-in methods for string manipulation.

my_string = 'Hello, world!'


_________________________________

# 7. Arrays
# collections of items of the same type. They are more memory-efficient compared to lists when working with large amounts of numeric data. Arrays need to be imported from the `array` module.

from array import array
my_array = array('i', [1, 2, 3, 4, 5]) # i is the type code, specifies the type of the elements in the array.
#type codes:
# (strings are not supported in py arrays.)
# 'b': Signed integer (1 byte)
# 'B': Unsigned integer (1 byte)
# 'h': Signed integer (2 bytes)
# 'H': Unsigned integer (2 bytes)
# 'i': Signed integer (4 bytes)
# 'I': Unsigned integer (4 bytes)
# 'l': Signed long integer (4 bytes, platform-dependent)
# 'L': Unsigned long integer (4 bytes, platform-dependent)
# 'q': Signed long long integer (8 bytes)
# 'Q': Unsigned long long integer (8 bytes)
# 'f': Floating point (4 bytes)
# 'd': Double precision floating point (8 bytes)

___________________________________

# Python shell
# If you want to try running a small piece of python code, type python on the terminal and hit enter. To exit: exit()

# Python Django shell
# python manage.py shell
# To run python commands within the project. To exit: exit()
