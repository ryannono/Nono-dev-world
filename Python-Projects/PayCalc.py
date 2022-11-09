def opening_statement():
    print("\n---------------------------------------------------------------\n")
    print("* Program name: Pay calculator (Paycal)\n")
    print("* Developer : Ryan Nono\n")
    print("* Last updated: March 2022")
    print("\n---------------------------------------------------------------\n")

    print("Welcome to my Pay calculator\n")
    print("This calculator can compute your wage!")
    print("\n---------------------------------------------------------------\n")

def get_hourly_rate():
    hourly_rate = float(input('\nPlease enter your hourly rate: '))
    return hourly_rate

def get_hours(hoursList, minutesList):
    
    print("Please enter the amount of hours you worked \n(then enter -1 to calculate)")
    while(1):
        time = float(input('\n- Hours: '))
        
        if time == -1:
            break
    
        hoursList.append(int(time))
        minutesList.append(round((time % 1) * 100))

def add_minutes(minutesList):
    MinuteSum = 0
    for minute in minutesList:
        MinuteSum = MinuteSum + minute
        
    return MinuteSum        
        
def add_hours(hoursList):
    HourSum = 0
    for hour in hoursList:
        HourSum = HourSum + hour
    
    return HourSum

#############################


#intro
opening_statement()

hoursList = []
minutesList = []

# get hours
get_hours(hoursList=hoursList, minutesList=minutesList)

# adds minutes
MinuteSum = add_minutes(minutesList)

# adds hours
HourSum = add_hours(hoursList)

# adds hours from minutes
extraHours = int(MinuteSum // 60) 

# computes totals
totalHours = HourSum + extraHours
leftMins = MinuteSum - (60*extraHours) 

#print totals
print('\n----------------------------------------------')
print('\nYou worked a total of',totalHours, 'hours and', leftMins, 'minutes')

# convert to float/math format and print
mathFormat = totalHours + (leftMins / 60)
print('\nIn math format that is: ', mathFormat, 'hours')
print('\n----------------------------------------------')

# calculate pay
pay = get_hourly_rate() * mathFormat

# print pay
print('\n----------------------------------------------')
print('\nYour pay should be: ', pay, 'dollars\n')
