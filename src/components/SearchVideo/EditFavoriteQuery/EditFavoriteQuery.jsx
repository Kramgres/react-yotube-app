import React, {useState} from 'react';
import styles from './EditFavoriteQuery.module.scss';
import {Button, Form, Input, Modal, Select, Slider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteQuery, updateFavoriteQuery} from "../../../redux/videos-reducer";

const {Option} = Select;

function EditFavoriteQuery({visibleModal, setVisibleModal, queryText, queryParams, editMode}) {
    const orderVariants = useSelector((state => state.videos.orderVariants));
    const minResults = useSelector((state => state.videos.minResults));
    const maxResults = useSelector((state => state.videos.maxResults));
    const defaultMaxResults = useSelector((state => state.videos.queryParams.maxResults));
    const [maxResultsValue, setMaxResultsValue] = useState(defaultMaxResults);
    const dispatch = useDispatch();

    const handleCancel = () => {
        setVisibleModal(false);
    };

    const onFormSubmit = (values) => {
        if(editMode){
            dispatch(updateFavoriteQuery(queryParams.id, values))
        }
        else{
            dispatch(addFavoriteQuery(values));
        }
        handleCancel();
    }

    const onMaxResultsChange = (value) => {
        setMaxResultsValue(value);
    }

    return (
        <Modal visible={visibleModal}
               title="Сохранить запрос"
               onCancel={handleCancel}
               width={510}
               footer={null}>
            <Form onFinish={onFormSubmit}
                  layout="vertical">
                <Form.Item
                    name="q"
                    label="Запрос"
                    initialValue={queryText}>
                    <Input placeholder="Укажите запрос" disabled={!editMode}/>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Название"
                    rules={[{required: true, message: 'Введите название'}]}
                    initialValue={queryParams?.title}>
                    <Input placeholder="Укажите название"/>
                </Form.Item>
                <Form.Item
                    name="order"
                    label="Сортировать по"
                    initialValue={queryParams?.order}>
                    <Select placeholder="Без сортировки">
                        <Option key={0} value="aaa">без сортировки</Option>
                        {orderVariants.map(((o, key) => (<Option key={key + 1} value={o.value}>{o.title}</Option>)))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="maxResults"
                    label="Максимальное количество"
                    initialValue={queryParams?.maxResults || maxResultsValue}>
                    <Slider
                        min={minResults}
                        max={maxResults}
                        onChange={onMaxResultsChange}
                        tipFormatter={null}
                        value={typeof maxResultsValue === 'number' ? maxResultsValue : 0}/>
{/*                    <InputNumber
                        min={minResults}
                        max={maxResults}
                        value={maxResultsValue}
                        onChange={onMaxResultsChange}/>*/}
                </Form.Item>
                <Form.Item className={styles.buttonWrapper}>
                    <Button onClick={handleCancel} type="secondary" htmlType="button" size={"large"} className={styles.button}>{editMode ? "Не изменять" : "Не сохранять"}</Button>
                    <Button type="primary" htmlType="submit" size={"large"} className={styles.button}>Сохранить</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditFavoriteQuery;