import AddTask from "@/components/AddTask";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList.jsx";
import TaskListPagination from "@/components/TaskListPagination.jsx";
import DateTimeFilter from "@/components/DateTimeFilter.jsx";
import Footer from "@/components/Footer.jsx";
import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { visibleTasksLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery,setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  },[filter, dateQuery])

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompletedTasksCount(res.data.completedCount);
      console.log(res.data);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page-1) * visibleTasksLimit,
    page * visibleTasksLimit
  ) 

  const totalPages = Math.ceil(filteredTasks.length/visibleTasksLimit);
  
  const handleTaskChanged = () => {
    fetchTasks();
  }

  const handleNext = () => {
    if(page < totalPages) {
      setPage(prev => prev+1)
    }
  }

  const handlePrev = () => {
    if(page > 1) {
      setPage(prev => prev-1)
    }
  }
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-">
          {/* dau trang*/}
          <Header />

          {/*Tao nhiem vu*/}
          <AddTask handleNewTaskAdded={handleTaskChanged}/>

          {/*Thong ke va bo loc*/}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />

          {/*Danh sach nhiem vu*/}
          <TaskList 
            filteredTasks={visibleTasks} 
            filter={filter} 
            handleTaskChanged={handleTaskChanged}  
          />

          {/*Phan trang va loc theo ngay*/}
          <div className="flex flex-col  items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter 
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          {/*Chan trang*/}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
