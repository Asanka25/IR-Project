birthplaces = ["ඉපදුන", "ඉපදුනු", "උපන්", "උපත", "ඉපදුණු"]
month_tokens = ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජුනි",
                "ජුලි",  "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"]
other_tokens = ["නලුවන්", "මිනිසුන්", "අය", "මිනිස්සු","නළුවන්", "මිනිස්සු", "පුද්ගලයන්", "පිරිස", "නලුවෝ", "ඇති", "තිබෙන"]
education_tokens = ["අද්‍යාපනය", "ඉගෙනුම", "ඉගෙනගත්","අධ්යාපන"]
nationalities=["ඕස්ට්රේලියානු","ඇමෙරිකානු","කැනේඩියානු","ඉංග්රීසි","ස්වීඩන්","ප්රංශ","නෝර්වීජියානු","ස්පාඤ්ඤ","බංග්ලාදේ"]

def classify(token_list):

    nationality = False
    religion = False
    education=False
    birthplace = False
    birthYear = False
    month_token = False
    other_tokens_str = ''
    other = False

    for token in token_list:
        if token.isdigit():
            birthYear = True
        elif token in month_tokens:
            month_token = True
        elif token in birthplaces:
            birthplace = True
            birthYear = True
        elif(token=="ජාතිය"):
            nationality=True
        elif(token=="ආගම"):
            religion=True
        elif(token=="පාසල" or token=="විශ්ව විද්‍යාලය"):
            education=True
        elif token in other_tokens:
            other = True
        else:
            other_tokens_str += token + ' '

    if(month_token == False and birthplace == False and birthYear == False and nationality==False and education==False and religion==False):
        return False
    else:
        return [birthplace, month_token, birthYear, other_tokens_str,nationality,religion,education]

def isEducation(query):
    for i in range(len(query.split())):
        if(query.split()[i] in education_tokens):
            return True," ".join(query.split()[:i])
    return False,""

