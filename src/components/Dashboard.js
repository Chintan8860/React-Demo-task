import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Table } from 'antd';
import './dashboard.css';

const TYPE_COLORS = {
  "0": "#48BEFF",
  "1": "#3DFAFF",
  "2": "#43C59E",
  "3": "#3D7068",
  "4": "#14453D",
}

const Dashboard = () => {

  const [userData, setUserData] = useState([])
  const [typeFilter, setTypeFilter] = useState(Object.keys(TYPE_COLORS).map(x => x.toString()))
  const [loading,setLoading] = useState(true)

  const getInitialData = async () => {
    const userDetails = await fetch('http://www.mocky.io/v2/5d889c8a3300002c0ed7da42')
    const user = await userDetails.json()
    setLoading(false)
    setUserData(user.items)
  }

  useEffect(() => {
    getInitialData()
  }, [])
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleFilter = (filter, checked) => {
    if (checked) {
      if (filter === 'all') {
        setTypeFilter(Object.keys(TYPE_COLORS).map(x => x.toString()))
        return
      }
      setTypeFilter((prev) => [...prev, filter])
    }
    else {
      if (filter === 'all') {
        setTypeFilter([])
        return
      }
      setTypeFilter((prev) => prev.filter(x => x !== filter))
    }
    console.log(filter, checked);
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'type',
      render(type) {
        return {
          props: {
            style: { background: TYPE_COLORS[type]  }
          },
          children: <div>{type}</div>
        };
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'name',
      dataIndex: 'fullName',
    },
    {
      title: 'Wallet-1',
      dataIndex: 'wallet1',
    },
    {
      title: 'Wallet-2',
      dataIndex: 'wallet2',
    }, {
      title: 'Wallet-3',
      dataIndex: 'wallet3',
    }
  ];
  return (
    <div className="container">

      <div className="filterContainer">
        <div>
          <span className="label">All</span> <input type="checkbox" id="color" name="color" value="all" checked={typeFilter.length === 5} onChange={(e) => handleFilter('all', e.target.checked)} />
        </div>
        {Object.keys(TYPE_COLORS).map((color) =>
          <div style={{ borderBottom: `3px solid ${TYPE_COLORS[color]}` }}>
            <span className="label">Type {color}</span>
            <input type="checkbox" id="color" name="color" value={color}
              checked={typeFilter.includes(color)}
              onChange={(e) => handleFilter(e.target.value, e.target.checked)} />
          </div>)}
      </div>

      <div>
        <Table columns={columns} loading={loading} dataSource={userData.filter((x) => typeFilter.includes(x.type.toString()))} mobileBreakPoint={768} />
      </div>
    </div>
  );
};

export default Dashboard;
