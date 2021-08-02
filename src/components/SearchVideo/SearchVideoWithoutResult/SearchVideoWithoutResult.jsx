import React from 'react';
import {Col, Row} from "antd";
import Search from "antd/es/input/Search";
import styles from  "./SearchVideoWithoutResult.module.scss";

function SearchVideoWithoutResult({onSearch, queryText, onInput}) {
    return (
        <div className={styles.search}>
            <div className="container">
                <div className={styles.search__wrapper}>
                    <h1 className={styles.title}>Поиск видео</h1>
                    <Row justify={"center"}>
                        <Col span={16}>
                            <Search
                                placeholder="Что хотите посмотреть?"
                                enterButton="Найти"
                                size="large"
                                value={queryText}
                                onInput={onInput}
                                onSearch={onSearch}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default SearchVideoWithoutResult;