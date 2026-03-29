from sqlalchemy import Integer, Column, String, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base 

class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    research_focus = Column(String, nullable=True)  
    location = Column(String, nullable=True) 
    professional_role = Column(String, nullable=True)

    reports = relationship("FinancialSummaryModel", back_populates="user")

class FinancialSummaryModel(Base):
    __tablename__ = "financial_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    report_text = Column(String, nullable=True)
    market_context = Column(String)
    generated_at = Column(DateTime, default=datetime.now)
    content = Column(JSON)
    summary_type = Column(String)
    filename = Column(String, nullable=True)
    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("UserModel", back_populates="reports")