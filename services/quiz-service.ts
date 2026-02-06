import axios from "axios";

export const getQuiz = async () => {
    const response = await axios.get('https://opentdb.com/api.php?amount=20&category=31&type=multiple');
    return response.data;
};