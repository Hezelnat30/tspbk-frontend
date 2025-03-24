import * as yup from "yup";

export const signinSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = signinSchema;

export const addSongSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  artist: yup.string().required("Artist is required"),
  youtubeUrl: yup.string().required("Youtube URL is required"),
  chordImageUrl: yup
    .mixed<FileList | string>()
    .required("Please upload a chord image"),
});
