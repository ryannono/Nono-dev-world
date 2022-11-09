
# initialise the fibonacci number list
# initialise the index/position indicator

fibList = []
i = 0

# while index is under 20
# if 0 and 1 aren't in fiblist append them
# add one to the index indicator for each
# add previous 2 numbers and assign to sum
# append sum to the fiblist

while i <= 19:
    
    if 0 not in fibList:
        fibList.append(0)
        i = i + 1

    if 1 not in fibList:
        fibList.append(1)
        i = i + 1

    sum = fibList[i-2] + fibList[i-1]
    fibList.append(sum)
    i = i + 1

# once fiblist has reached index 19 (20 elements)
# print fiblist

print('The first 20 fibonacci numbers are:', fibList)
    

