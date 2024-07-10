import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import Login from "../components/Login";
import RegisterForm from "../components/RegisterForm";
import UserList from "../components/UserList";

const RoutesComponent: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/users" element={<UserList />} />
        </Routes>
    );
};

export default RoutesComponent;