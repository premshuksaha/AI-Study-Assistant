import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {

    const{ user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || token === "undefined" || token === "null") {
            clearUser();
            setIsLoading(false);
            navigate("/");
            return;
        }

        if (user) {
            setIsLoading(false);
            return;
        }

        let isMounted = true;
        const fetchUserInfo = async () => {
            try {
                const response=await axiosInstance.get(API_PATHS.AUTH.PROFILE);
                if (isMounted && response?.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchUserInfo();



        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);

    return { user, isLoading };
};