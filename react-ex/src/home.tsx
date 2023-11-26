// Importing necessary dependencies and components from external libraries
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { PostList } from './postList';

// Interface representing the structure of user data
interface DataType {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

// Functional component definition for the Home page
export const Home: React.FC = () => {
    // State to manage user data, selected user id and name, and filtered information
    const [userData, setUserData] = useState<DataType[]>([]);
    const [id, setId] = useState<any>(null);
    const [name, setName] = useState<any>(' ');
    const [filteredInfo, setFilteredInfo] = useState<FilterValue | null>(null);

    // Function to display selected user's posts
    const displaySelectedUserPosts = (id: number, name: string) => {
        setId(id);
        setName(name);
        console.log(id);
    }

    // Effect hook to fetch user data from an external API when the component mounts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    // Columns configuration for the Ant Design Table component
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: userData ? userData.map(d => ({ text: d.name, value: d.name })) : [],
            filterSearch: true,
            onFilter: (value: string, record: any) => record.name.startsWith(value),
            width: 500,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            filters: userData ? userData.map(d => ({ text: d.email, value: d.email })) : [],
            filterSearch: true,
            onFilter: (value: string, record: any) => record.email.startsWith(value),
            width: 500,
        },
        {
            title: 'Company Name',
            dataIndex: ['company', 'name'],
            width: 500,
        },
    ];

    // Function to handle table changes (pagination, filters, etc.)
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters: any, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setFilteredInfo(filters);
    };

    // Rendering the component JSX
    return (
        <>
            {/* Ant Design Table component to display user data */}
            <Table
                columns={columns}
                dataSource={userData}
                loading={!userData.length}
                onChange={onChange}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event: any) => {
                            displaySelectedUserPosts(record.id, record.name);
                        }, // click row
                    };
                }}
            />

            {/* Displaying the PostList component if a user is selected */}
            {id !== null && (
                <PostList
                    id={id}
                    setId={setId}
                    selectedName={name}
                    setSelectedName={setName}
                    selectedEmail={''}
                    setSelectedEmail={(value: string) => {
                        throw new Error('Function not implemented.');
                    }}
                />
            )}
        </>
    );
};
