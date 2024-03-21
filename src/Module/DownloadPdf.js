import jsPDF from 'jspdf';

export const DownloadProfile  = (profileData,photoUrl)=>{
    const pdf = new jsPDF();

     pdf.setFontSize(16);
     pdf.setFont('helvetica', 'normal');

     pdf.text(20, 20, 'Profile');

    const imgData = photoUrl; 
    const imgWidth = 40;
    const imgHeight = 40;
    const imgX = pdf.internal.pageSize.width - imgWidth - 20; 
    const imgY = 25; 

    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight);

     pdf.setFontSize(12);
     pdf.text(20, 30, `First Name: ${profileData.firstName}`);
     pdf.text(20, 40, `Last Name: ${profileData.lastName}`);
     pdf.text(20, 50, `Email: ${profileData.email}`);
     pdf.text(20, 60, `Mobile No: ${profileData.mobileNo}`);
      
     pdf.text(20, 70, 'Address:');

     pdf.text(30, 80, `Street: ${profileData.address.street}`);
     pdf.text(30, 90, `City: ${profileData.address.city}`);
     pdf.text(30, 100, `State: ${profileData.address.state}`);
     pdf.text(30, 110, `Zip: ${profileData.address.zip}`);
     pdf.text(30, 120, `Country: ${profileData.address.country}`);
 
     pdf.text(20, 130, 'Education:');

     let yPos = 140;
     profileData.education.forEach((edu, index) => {
       pdf.text(30, yPos, `Degree ${index + 1}: ${edu.degree}`);
       pdf.text(40, yPos + 10, `Major: ${edu.major}`);
       pdf.text(40, yPos + 20, `University: ${edu.university}`);
       pdf.text(40, yPos + 30, `Graduation Year: ${edu.graduationYear}`);
       yPos += 50;
     });

     const currentDate = new Date().toLocaleDateString().replaceAll('/', '-');
     const currentTime = new Date().toLocaleTimeString().replaceAll(':', '-');

     const fileName = `${profileData.firstName}_${profileData.lastName}_${currentDate}_${currentTime}.pdf`;

     pdf.save(fileName);
}

