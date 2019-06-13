package com.forum.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.forum.dao.UserDao;
import com.forum.dao.impl.UserDaoImpl;


/**
 * Servlet implementation class UpdateFaceServlet
 */
@WebServlet("/UpdateFace")
public class UpdateFaceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateFaceServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
        response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        response.addHeader("Access-Control-Max-Age", "1800");//30 min
		
		String serverPath = request.getSession().getServletContext().getRealPath("/");
		System.out.println(serverPath);
		String saveDirPath = serverPath + "img";
		
		String path = "";
		String res = "-1";
		
		Boolean flag1 =false;
		Boolean flag2 =false;
		
		String account = "";
		
		File saveDirPathFileObj = new File(saveDirPath);
        
        if (!saveDirPathFileObj.exists()) {
            saveDirPathFileObj.mkdirs();
        }
        
        
        DiskFileItemFactory factory = new DiskFileItemFactory();
        
        factory.setSizeThreshold(20 * 1024);
        
        ServletFileUpload upload = new ServletFileUpload(factory);
        
        upload.setSizeMax(20 * 1024 * 1024);
        
        upload.setHeaderEncoding("UTF-8");
        try {
            //取到前台传过来的所有值选项
        	 List<FileItem> items =upload.parseRequest(request);
        	 System.out.println(items);
        	 for(FileItem item:items){
        	 //如果fileitem中封装的是普通输入项的数据（输出名、值）
        		 if(item.isFormField()){
        			 String filedName = item.getFieldName();//普通输入项数据的名
        			 //解决普通输入项的数据的中文乱码问题
        			 String filedValue = item.getString("UTF-8");//普通输入项的值
        			 account = filedValue;
        			 System.out.println(account);
        		 }else{
        			 //如果fileitem中封装的是上传文件，得到上传的文件名称，        
        			 String fileName = item.getName();//上传文件的名
        			 //多个文件上传输入框有空 的 异常处理
        			 if(fileName==null||"".equals(fileName.trim())){  //去空格是否为空
        				 continue;// 为空，跳过当次循环，  第一个没输入则跳过可以继续输入第二个
        			 }
        			 //注意：不同的浏览器提交的文件名是不一样的，有些浏览器提交上来的文件名是带有路径的，如：  c:\a\b\1.txt，而有些只是单纯的文件名，如：1.txt
        			 //处理上传文件的文件名的路径，截取字符串只保留文件名部分。//截取留最后一个"\"之后，+1截取向右移一位（"\a.txt"-->"a.txt"）
        			 fileName = URLDecoder.decode(fileName.substring(fileName.lastIndexOf("/")+1));
        			 //拼接上传路径。存放路径+上传的文件名
        			 String filePath = saveDirPath+"/"+account+"/"+fileName;
        			 String folderpath = saveDirPath + "/"+account;
        			 File folderPathFileObj = new File(folderpath);
        		        
        		        if (!folderPathFileObj.exists()) {
        		        	folderPathFileObj.mkdirs();
        		        }
        		     path = "Forum/img/"+account +"/"+fileName;
        			 System.out.println(account);
        			 System.out.println(path);
        			 
        			 
        			 //构建输入输出流
        			 InputStream in = item.getInputStream(); //获取item中的上传文件的输入流 
        			 OutputStream out = new FileOutputStream(filePath); //创建一个文件输出流
        			 //创建一个缓冲区
        			 byte b[] = new byte[1024];
        			 //判断输入流中的数据是否已经读完的标识
        			 int len = -1;
        			 //循环将输入流读入到缓冲区当中，(len=in.read(buffer))！=-1就表示in里面还有数据
        			 while((len=in.read(b))!=-1){  //没数据了返回-1
        				 //使用FileOutputStream输出流将缓冲区的数据写入到指定的目录(savePath+"\\"+filename)当中
        				 out.write(b, 0, len);
        			 }
        			 UserDao userDao = new UserDaoImpl();
        			 res = userDao.UpdateImg(account,path);
        			 //关闭流
        			 out.close();
        			 in.close();
        			 //删除临时文件
        			 try {
        				 Thread.sleep(3000);
        			 } catch (InterruptedException e) {
        				 e.printStackTrace();
        			 }
        			 item.delete();//删除处理文件上传时生成的临时文件
        			 flag2 = true;
        		 }    
        	 }    
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        response.getWriter().write(res);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
