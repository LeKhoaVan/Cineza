import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import moment from 'moment';
import 'moment/locale/vi'; // Import ngôn ngữ tiếng Việt

moment.locale('vi'); // Thiết lập ngôn ngữ mặc định cho moment

// Nếu cần, bạn cũng có thể cấu hình định dạng ngày tháng cho ngôn ngữ việt
moment.updateLocale('vi', {
    months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    weekdays: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
});

AppRegistry.registerComponent(appName, () => () => <App />);