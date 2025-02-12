
# Documentation for Onboarding Screen #

###  Made By Ashok Sharma & Kalpana Baghel ###

# Initinilize the file and run in android #

# 1 #
 In command prompt
npx react-native init Onboarding
cd Onboarding

# 2 #
"if all files do not download, then try this"
npm install -g @react-native-community/cli

# 3 #
then run
npx react-native run-android

'''Reach till these step:  The App must be downloaded in your android !!! Do every possible thing to run'''

### Install these Dependencies ###

npm install @react-navigation/native
npm install @react-navigation/stack

npm install '@react-native-async-storage/async-storage';
npm install react-native-swiper 

npm install react-native-safe-area-context
npm install react-native-screens

''For user friendly''

npm install react-native-reanimated
npm install react-native-gesture-handler

one more dependency to install for the font:
 ## this will link the font to project #

npx react-native-asset   

'''  two screens 
# Onboarding  and  HomeScreen # 
'''

the screens are in app folder
Firstly replace the app.tsx code into simpler code which only gives "Hello" print
and then customize feature by feature

"Final codes in"
#
Onboarding.tsx
Home.tsx
#

I have made a folder named 'types' contains 'types' named file which i used to define the screens"
because i got error that " Home is not recognizable " so just defined them.

In App.tsx, the code execution starts from here ..it takes 2 screens which i mentioned.

### ATTENTION!! Do not do anything in the android and ios folder ###

I got problem in inserting the image path...because
ChatGPT told me to make the assets folder inside the android folder...i write the image path many times but everytime I found the same error that '''image_name.png does not exist''' 

But After discussing with IJ:
He told me to put out every folder out of android and then  
## IT Worked Successfully ##


####  IF YOU FEEL ANY KIND OF PROBLEM RELATED TO THIS, THEN CONTACT KALPANA ...PLEASE!!! ####


