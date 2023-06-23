import { Button, Card, Form, Input } from 'antd';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useToast } from '../../hooks/useToast';
import { useCreateNoteMutation } from '../../redux/note/note.service';
import styles from './noteCreator.module.scss';
import { INoteCreator } from './types';

const NoteCreator = (props: INoteCreator) => {
  const { handleClose } = props;

  const [createNoteApi, { isLoading }] = useCreateNoteMutation();

  const { errorToast, successToast } = useToast();
  const { matches: isMobile } = useMediaQuery('(max-width :800px)');
  const [form] = Form.useForm();

  const handleSubmit = async (values: { title: string }) => {
    try {
      const result = await createNoteApi(values).unwrap();

      if (result?.status === 200) {
        successToast(result?.message);
        form.resetFields();
        handleClose();
      }
    } catch (err: any) {
      errorToast(err?.data?.message ?? undefined);
    }
  };
  return (
    <Card
      className={styles.card}
      title='Create Note'
      extra={<Button onClick={handleClose} icon={<i className='ri-close-line'></i>}></Button>}
      bodyStyle={{ padding: isMobile ? '1rem' : '1rem 2rem' }}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item
          style={{ marginBottom: '10px' }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ marginBottom: '0px' }} className={styles.submit_wrapper}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Add Note
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NoteCreator;
