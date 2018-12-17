# Mooquik 📷
Created for a Hackathon project, Mooquik is a mobile app that allows users to track when their milk will expire by ‘quickly’  taking a picture  of their grocery receipt.


## About Mooquik
With Mooquik, a user can take a picture of their grocery receipt or choose one from their existing photo library. The app then passes the image to Google Cloud Vision API which will detect and extract text from the image via OCR Machine Learning. If ‘relevant’ words are found, the app will write to Firebase for information storage and retrieval. In addition the app was created using the React Native framework for mobile development.


 ## 🛠️ Technologies Used
- Front-end: React Native, Redux, Google Cloud Vision API, React-Native Elements, React-Navigation, React-Native Image Picker
- Back-end: Firebase


## Future improvements to the application
1. Implement application for additional grocery items
2. Include alert notifications to the user
3. Add calendar reminder functionalities
