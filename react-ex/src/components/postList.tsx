// Importing necessary dependencies and components from external libraries
import React, { useEffect, useState } from 'react';
import { FloatButton, List } from 'antd';
import UserOutlined from '@ant-design/icons';
import { FormDialog } from './add-post';

// Interface representing the structure of user post data
interface PostDataType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Props interface for the PostList component
interface PostListProps {
  id: number;
  setId: (value: number) => void;
  selectedName: string;
  setSelectedName: (value: string) => void;
  selectedEmail: string;
  setSelectedEmail: (value: string) => void;
}

// Functional component definition for displaying a list of posts
export const PostList: React.FC<PostListProps> = ({ id, setId, selectedName, setSelectedName }) => {
  // State to manage the list of posts and form values
  const [postsData, setPostsData] = useState<PostDataType[]>([]);
  const [values, setValues] = useState({});

  // Filtering posts based on the current user id
  const data = postsData?.filter(post => post.userId == id);

  // Function to handle form submission and add a new post
  const onFinish = (value: any) => {
    setValues(value);

    // Creating a new post object
    const newPost = {
      'userId': id,
      'id': 0,
      'title': value.post.title,
      'body': value.post.body
    };

    // Logging the new post to the console (for demonstration purposes)
    console.log(newPost);

    // Updating the list of posts with the new post
    setPostsData((post) => [...post, newPost]);
  };

  // Effect hook to fetch data from an external API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPostsData(data))
      .catch(error => console.error('Error fetching posts data:', error));
  }, []);

  // Rendering the component JSX
  return (
    <>
      {/* FormDialog component for adding new posts */}
      <FormDialog values={values} setValues={setValues} onFinish={onFinish} />

      {/* Displaying the selected user's name */}
      <h3>{selectedName}</h3>

      {/* Displaying a list of posts using the Ant Design List component */}
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={item.title}
              description={item.body}
            />
          </List.Item>
        )}
      />
    </>
  );
};
