import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scoped.css";
import Home from "./components/Home/Home.jsx";
import PostModal from "./components/PostModal/PostModal.jsx";
import configureStore from "./configureStore";
import "./global.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { NewPostModal } from "./components/NewPostModal/NewPostModal";
import Navbar from "./components/Navbar/Navbar";
import AuthModal from "./components/AuthModal/AuthModal";
import { ModalWrapper } from "./components/ModalWrapper/ModalWrapper";
import LoginCheck from "./components/LoginCheck/LoginCheck";
const store = configureStore();

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Provider store={store}>
          <LoginCheck />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="post/:id" element={<PostModal />}></Route>
              </Route>
            </Routes>
            <NewPostModal />
            <AuthModal />
          </BrowserRouter>
        </Provider>
      </div>
    </div>
  );
}

export default App;
