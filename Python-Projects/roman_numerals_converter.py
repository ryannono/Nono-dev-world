
s = input("\nPlease enter a roman numeral number: ")

myDic = {
    "I": 1,
    "i": 1,
    "V": 5,
    "v": 5,
    "X": 10,
    "x": 10,
    "L": 50,
    "l": 50,
    "C": 100,
    "c": 100,
    "D": 500,
    "d": 500,
    "M": 1000,
    "m": 1000}

length = len(s)
add=0

for index, char in enumerate(s):
    next_index = index+1
    
    if next_index < length:
        
        next_char = s[index+1]
        
        if (char == "I" or char == "i") and (next_index < length) and (next_char == "V" or next_char == "v"):
            add = add - myDic[char]
        elif (char == "I" or char == "i") and (next_index < length) and (next_char == "X" or next_char == "v"):
            add = add - myDic[char]
        elif (char == "X" or char == "x") and (next_index < length) and (next_char == "L" or next_char == "l"):
            add = add - myDic[char]
        elif (char == "X" or char == "x") and (next_index < length) and (next_char == "C" or next_char == "c"):
            add = add - myDic[char]
        elif (char == "C" or char == "c") and (next_index < length) and (next_char == "D" or next_char == "d"):
            add = add - myDic[char]
        elif (char == "C" or char == "c") and (next_index < length) and (next_char == "M" or next_char == "m"):
            add = add - myDic[char]
    else:
        add = add + myDic[char]
        
print("\nYour roman numeral in regular int format is: ",add,'\n') 