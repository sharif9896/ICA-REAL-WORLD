import ExcelJS from 'exceljs';
import fs from 'fs';


export async function generateExcel(reportData, filePath) {
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Attendance Report');


sheet.columns = [
{ header: 'Reg No', key: 'Reg_no', width: 15 },
{ header: 'Name', key: 'Name', width: 25 },
{ header: 'Class', key: 'Class', width: 10 },
{ header: 'Department', key: 'Department', width: 15 },
{ header: 'Present', key: 'totalPresent', width: 10 },
{ header: 'Working Days', key: 'totalDays', width: 12 },
{ header: 'Percentage', key: 'percentage', width: 12 },
{ header: 'Status', key: 'status', width: 10 },
];


reportData.forEach((r) => sheet.addRow(r));


await workbook.xlsx.writeFile(filePath);
return filePath;
}
