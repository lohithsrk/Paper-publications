const excelJS = require("exceljs");
const path = require('path');

const { Paper } = require('../database/database')

exports.generateReport = async (req, res) => {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Papers");

    worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "Title of the Paper", key: "title", width: 10 },
        { header: "Authors", key: "authors", width: 10 },
        { header: "Year of publication", key: "year", width: 10 },
    ];
    const papers = await Paper.findAll({ order: [['updatedAt', 'DESC']], raw: true })
    papers.forEach((paper, i) => {
        paper.s_no = i + 1;
        worksheet.addRow(paper);
    });
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    try {
        const data = await workbook.xlsx.writeFile(path.join(__dirname, '../reports/report.xlsx'))
            .then(() =>
                res.sendFile(path.join(__dirname, '../reports') + '/report.xlsx')
            );
    } catch (err) {
        console.log("🚀 ~ file: generateReport.controller.js:30 ~ exports.generateReport= ~ err", err)
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }
};
