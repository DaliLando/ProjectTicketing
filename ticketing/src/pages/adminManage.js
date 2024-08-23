import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { getAllUsers } from '../API/userApi'
import { getLocalStorage } from '../helpers/localStorage';

const AdminManage = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { userList } = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle block/unblock user
  const handleBlockUnblock = async (userId, isBlocked) => {
    try {
      let token = getLocalStorage("token");
      const endpoint = `${process.env.REACT_APP_URI}/user/${isBlocked ? 'unblock' : 'block'}/${userId}`;
      
      await axios.patch(endpoint, {}, { headers: { "Authorization": token } });

      // Update the user's block status in the state
      setUsers(users.map(user =>
        user._id === userId ? { ...user, isBlocked: !isBlocked } : user
      ));
    } catch (error) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, error);
    }
  };

  return (
    <div>
       <h1 style={{textAlign:"center", marginTop:"30px"}}> Manage Users : </h1>
    <div style={{display:"flex", flexWrap:'wrap',justifyContent:"space-evenly",margin:"20px"}}>
      {users.map(user => (
        <Card key={user._id} className="mb-3" style={{width:"300px"}}>
          <Card.Body>
            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}<br />
              <strong>Status:</strong> {user.isBlocked ? 'Blocked' : 'Active'}
            </Card.Text>
            <Button
              variant={user.isBlocked ? 'success' : 'danger'}
              onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
            >
              {user.isBlocked ? 'Unblock User' : 'Block User'}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
    </div>
  );
};

export default AdminManage;
