import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FloatButton, Form, Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import form from 'antd/es/form';

interface FormDialogProps{
    values:{};
    setValues:(value:any)=>void;
    onFinish:(values:any)=>void;

}
export const FormDialog: React.FC<FormDialogProps>=({values,setValues,onFinish})=> {
    const [open, setOpen] = React.useState(false);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState<boolean>(false);
    // To disable submit button at the beginning.
    useEffect(() => {
      setClientReady(true);
    }, []);
    /* eslint-enable no-template-curly-in-string */
    const HandelOnFinish = (values: any) => {
        onFinish(values);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
             <FloatButton onClick={handleClickOpen} />
            <Button variant="outlined" onClick={handleClickOpen}>
              add new post
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                     
                    </DialogContentText>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={HandelOnFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name={['post', 'title']} label="title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['post', 'body']} label="body" rules={[{ required: true }]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button onClick={handleClose}
                              type="primary"
                              htmlType="submit"
                              disabled={
                                !clientReady ||
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                              }
                              
                              >
                                Submit 
                            </Button>
                        </Form.Item>
                    </Form>
                </DialogContent>
             
            </Dialog>
        </React.Fragment>
    );
}