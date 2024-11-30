const xl = require("excel4node");

exports.generateReport = async (bills, reportType) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("Report");

    // Add headers
    ws.cell(1, 1).string("User ID");
    ws.cell(1, 2).string("Units Used");
    ws.cell(1, 3).string("Amount");
    ws.cell(1, 4).string("Status");
    ws.cell(1, 5).string("Date");

    // Populate rows
    bills.forEach((bill, i) => {
        ws.cell(i + 2, 1).string(bill.userId.toString());
        ws.cell(i + 2, 2).number(bill.unitsUsed);
        ws.cell(i + 2, 3).number(bill.amount);
        ws.cell(i + 2, 4).string(bill.status);
        ws.cell(i + 2, 5).string(bill.billDate.toISOString());
    });

    // Save report
    const fileName = `reports/${reportType}-report.xlsx`;
    await wb.write(fileName);
    return fileName;
};
