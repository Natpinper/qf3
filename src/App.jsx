import { Routes, Route } from "react-router-dom";
import"./index.css"
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import LogIn from "./pages/LogIn";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import MyProfile from "./pages/MyProfile";
import SignUpPage from "./pages/SignUpPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import UserDetailsPage from "./pages/UserDetailsPage";
import CreatePost from "./pages/CreatePost";
import EditUser from "./pages/EditUser";
import UserPostsPage from "./pages/UserPostsPage";
import EditPost from "./pages/EditPost";
import NewNavBar from "./components/newNavBar";

function App() {
  return (
    <div className="App">
      <NewNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LogIn />
            </IsAnon>
          }
        />
        <Route
          path="/user/:userId/profile"
          element={
            <IsPrivate>
              <MyProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId/post/create"
          element={
            <IsPrivate>
              <CreatePost />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId/profile/edit"
          element={
            <IsPrivate>
              <EditUser />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId/post/:postId"
          element={
            <IsPrivate>
              <UserPostsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId/post/:postId/edit"
          element={
            <IsPrivate>
              <EditPost />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
