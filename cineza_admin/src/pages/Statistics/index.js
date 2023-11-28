import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';

import 'react-datepicker/dist/react-datepicker.css';
import './statistics.css'
import axios from 'axios';
import moment from 'moment/moment';


function Statistics() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [userInput, setUserInput] = useState('');
    const [movieInput, setMovieInput] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);
    const [foundMovies, setFoundMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectUser, setSelectUser] = useState("");

    const [totalOrder, setTotalOrder] = useState(0);
    const [totalTicket, setTotalTicket] = useState(0);
    const [dataOrderFilter, setDataOrderFilter] = useState('');
    const [dataTicketFilter, setDataTicketFilter] = useState('');

    const [totalOrderByFilter, setTotalOrderByFilter] = useState(0);
    const [totalTicketByFilter, setTotalTicketByFilter] = useState(0);
    const [totalTicketThuong, setTotalTicketThuong] = useState(0);
    const [totalTicketVIP, setTotalTicketVIP] = useState(0);

    const [dataChartPieOrder, setDataChartPieOrder] = useState({
        labels: ["Tổng doanh thu còn lại", "Tổng theo thời gian đã chọn"],
        datasets: [{
            label: "Biểu đồ doanh thu",
            data: [0, 0]
        }]
    });

    const [dataChartPieTicket, setDataChartPieTicket] = useState({
        labels: ["Tổng vé VIP", "Tổng vé thường"],
        datasets: [{
            label: "Biểu đồ doanh thu",
            data: [0, 0]
        }]
    });



    // Hàm xử lý tìm kiếm user
    const handleUserSearch = async (e) => {
        setUserInput(e.target.value)
        try {
            if (e.target.value.trim().length > 0) {
                const resultApi = await axios.get(`http://localhost:9000/cineza/api/v1/user/find-user-by-name/${e.target.value}`)
                if (resultApi != null) {
                    setFoundUsers(resultApi.data);
                }
            }
        } catch (error) {
            console.log("error get user input: " + error)
        }
        if (e.target.value.trim().length == 0) {
            setFoundUsers([]);
            setSelectUser("")
        }

    };

    // Hàm xử lý tìm kiếm movie
    const handleMovieSearch = async (e) => {
        setMovieInput(e.target.value)
        try {
            if (e.target.value.trim().length > 0) {
                const resultApi = await axios.get(`http://localhost:9000/cineza/api/v1/movie/get-all?movieName=${e.target.value}`);
                if (resultApi != null) {
                    setFoundMovies(resultApi.data);
                }
            }
        } catch (error) {
            console.log("error get movie input: " + error);
        }
        if (e.target.value.trim().length == 0) {
            setFoundMovies([]);
            setSelectedMovie("")
        }

    };

    useEffect(() => {

    }, [foundUsers, foundMovies]);


    const handleMovieChange = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
        setSelectedMovie(selectedValue);
        setSelectUser('')
        setUserInput('')
        setFoundUsers([])
    };

    const handleUserChange = (e) => {
        const selectValue = e.target.value;
        console.log(selectValue);
        setSelectUser(selectValue);
        setSelectedMovie("")
        setMovieInput('')
        setFoundMovies([])
    }

    useEffect(() => {
        const getTotalOrder = async () => {
            const resultData = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/get-total-order`);
            if (resultData != null) {
                let total = 0;
                resultData.data.forEach(order => {
                    total += order.priceTotal
                });
                setTotalOrder(total)
            }
        };
        getTotalOrder();
    }, [])

    useEffect(() => {
        const getTotalTicket = async () => {
            const resultData = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/get-total-ticket`);
            if (resultData != null) {
                let total = 0;
                resultData.data.forEach(ticket => {
                    total++;
                });
                setTotalTicket(total)
            }
        };
        getTotalTicket();
    }, [])

    useEffect(() => {
        const getStatistics = async () => {
            const stDay = startDate == "" ? "" : moment(startDate).format("YYYY-MM-DD");
            const edDay = endDate == "" ? "" : moment(endDate).format("YYYY-MM-DD");
            const statisticsResult = await axios.get(`http://localhost:9000/cineza/api/v1/statistics/get-order-by-time-user-movie?timeStart=${stDay}&timeEnd=${edDay}&user=${selectUser}&movie=${selectedMovie}`);
            let total = 0;
            if (statisticsResult.data != "") {
                for (const order of statisticsResult.data) {
                    total += order.priceTotal
                }
                setDataOrderFilter(statisticsResult.data)
            }
            if (totalOrder != 0) {
                const newData = {
                    labels: ["Tổng doanh thu còn lại", "Tổng doanh thu theo điều kiện"],
                    datasets: [{
                        label: "Biểu đồ doanh thu",
                        data: [totalOrder - total, total], // Giá trị mới
                    }]
                };
                setDataChartPieOrder(newData);
            }
            setTotalOrderByFilter(total)
        };
        getStatistics();
    }, [startDate, endDate, selectUser, selectedMovie])


    useEffect(() => {
        const getStatisticsTicket = async () => {
            const stDay = startDate == "" ? "" : moment(startDate).format("YYYY-MM-DD");
            const edDay = endDate == "" ? "" : moment(endDate).format("YYYY-MM-DD");
            const statisticsResult = await axios.get(`http://localhost:9000/cineza/api/v1/statistics//get-ticket-by-time-user-movie?timeStart=${stDay}&timeEnd=${edDay}&user=${selectUser}&movie=${selectedMovie}`);
            let total = 0;
            let totalThuong = 0;
            let totalVIP = 0;
            if (statisticsResult.data != "") {
                for (const ticket of statisticsResult.data) {
                    total++;
                    if (ticket.codeTypeSeat === "ts01") {
                        totalThuong++;
                    } else if (ticket.codeTypeSeat === "ts02") {
                        totalVIP++;
                    }
                }
                setDataTicketFilter(statisticsResult.data)
            }
            if (totalTicket != 0) {
                const newData = {
                    labels: ["Tổng Vé VIP", "Tổng vé thường"],
                    datasets: [{
                        label: "Biểu đồ số lượng vé",
                        data: [totalVIP, totalThuong], // Giá trị mới
                    }]
                };
                setDataChartPieTicket(newData);
            }
            setTotalTicketVIP(totalVIP);
            setTotalTicketThuong(totalThuong);
            setTotalTicketByFilter(total);
        };
        getStatisticsTicket();
    }, [startDate, endDate, selectUser, selectedMovie])

    return (
        <div className='statistics-wrapper'>
            <div className='statistics-filter'>
                <div className='date-piker-button'>
                    <div className='statistics-date-picker-content'>
                        <div className="statistics-date-picker-container">
                            <label>Ngày bắt đầu:</label>
                            <DatePicker dateFormat="dd-MM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>

                        <div className="statistics-date-picker-container">
                            <label>Ngày kết thúc:</label>
                            <DatePicker dateFormat="dd-MM-yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                    {/* <button className="statistic-button">
                        Thống kê
                    </button> */}

                </div>


                <div className="statistics-search-container">
                    <label>Tìm khách hàng:</label>
                    <input type="text" value={userInput} onChange={handleUserSearch} />
                    <FormControl
                        sx={{ width: "80%" }}
                        size="small"
                    >
                        {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectUser}
                            style={{ width: '190px', marginRight: '55px' }}
                            onChange={handleUserChange}

                        >
                            {foundUsers.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.code}>
                                        {st.fullName} - {st.code}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className="statistics-search-container">
                    <label>Tìm phim:</label>
                    <input type="text" value={movieInput} onChange={handleMovieSearch} />
                    <FormControl
                        sx={{ width: "80%" }}
                        size="small"
                    >
                        {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectedMovie}
                            style={{ width: '190px', marginRight: '55px' }}
                            onChange={handleMovieChange}

                        >
                            {foundMovies.map((st, index) => {
                                return (
                                    <MenuItem key={index} value={st.code}>
                                        {st.movieName} - {st.code}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>


            </div>
            <div className='statistics-content'>
                <div className='statistics-doanh-thu'>
                    <div className='statistics-infor-order'>
                        <h4>Thống kê doanh thu:</h4>
                        <p>Tổng doanh thu: {totalOrder.toLocaleString('vi-VN')} VND</p>
                        <p>Từ ngày: {startDate == "" ? "" : moment(startDate).format("DD-MM-YYYY")} đến ngày {endDate == "" ? "" : moment(endDate).format("DD-MM-YYYY")} có:</p>
                        <p> - Tổng doanh thu: {totalOrderByFilter.toLocaleString('vi-VN')} VND</p>
                    </div>
                    <div className='statistics-chart-order'>
                        <p>Biểu đồ doanh thu theo điều kiện</p>
                        <Pie data={dataChartPieOrder} options={{
                            legend: { display: true },
                            title: {
                                display: true,
                                text: 'Biểu đồ doanh thu',
                            },
                        }}
                        />
                    </div>
                </div>
                <div className='statistics-ve'>
                    <div className='statistics-infor-ticket'>
                        <h4>Thống kê số lượng vé:</h4>
                        <p>Tổng số vé bán ra: {totalTicket} vé</p>
                        <p>Từ ngày: {startDate == "" ? "" : moment(startDate).format("DD-MM-YYYY")} đến ngày {endDate == "" ? "" : moment(endDate).format("DD-MM-YYYY")} có:</p>
                        <p> - Tổng số vé bán ra theo: {totalTicketByFilter} vé</p>
                        <p> - Tổng số vé VIP : {totalTicketVIP} vé</p>
                        <p> - Tổng số vé Thường: {totalTicketThuong} vé</p>
                    </div>
                    <div className='statistics-chart-ticket'>
                        <p>Biểu đồ số lượng các loại vé theo điều kiện</p>
                        <Pie data={dataChartPieTicket} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics