package com.forum.util;

import java.beans.PropertyVetoException;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class JDBCUtil {
	static ComboPooledDataSource dataSource = null;
	
	static {
		dataSource = new ComboPooledDataSource();
	}
	
	public static Connection getConn() throws SQLException {
		return dataSource.getConnection();
		
	}
	
	public static void release(Connection conn,PreparedStatement ps,ResultSet rs) {
		try {
			conn.close();
			ps.close();
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void release(Connection conn,PreparedStatement ps) {
		try {
			conn.close();
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
