import React, {Component} from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import {
    LoadMore,
    Panel,
    PanelHeader,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    Tab,
    TabBody,
    NavBar,
    NavBarItem,
} from 'react-weui';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        let {
            data: {
                banner,
                dataList,
                filter
            }
        } = props;
        dataList = this.transform(dataList)
        this.banner = banner;
        this.filter = filter;
        this.dataList = dataList;

        this.state = {
            tab: 0
        }
    }

    handleTabClick = (scope) => {
        let tab = 0;
        switch (scope) {
            case 'grade1':
                tab = 0;
                break;
            case 'grade2':
                tab = 1;
                break;
            case 'grade3':
                tab = 2;
                break;
            case 'grade4':
                tab = 3;
                break;
            case 'grade5':
                tab = 4;
                break;
            case 'grade6':
                tab = 5;
                break;
            default:

        }
        this.setState({tab});
        // this.getData(scope);
    }

    // 对象转化为数组
    transform = (obj) => {
        let arr = [];
        for (let item in obj) {
            arr.push({version: item, books: obj[item]});
        }
        return arr;
    }

    render() {
        // console.log("转化后的数据......")
        // console.log(this.dataList)
        // console.log(this.dataList.books)
        //测试。。。。。。。

        return (
            <div className="App">
                <div className="imgPanel">
                    <img src={this.banner} alt="gankao"/>
                </div>
                <Tab>
                    <NavBar>
                        {this.filter.map((v, index) => <NavBarItem key={"NavBarItem" + index}>
                            <a href={v.url} className={v.active
                                ? 'filterNav active'
                                : 'filterNav'}>{v.name}</a>
                        </NavBarItem>)}
                    </NavBar>
                    <TabBody>
                        {this.dataList.length === 0 ?
                            <LoadMore loading>加载中......</LoadMore> : this.dataList.map((booksItem, index) => {
                                return <div key={'src_tngxie' + index}>
                                    <Panel>
                                        <PanelHeader className="banben">
                                            {booksItem.version}
                                        </PanelHeader>
                                        <PanelBody>
                                            {booksItem.books && booksItem.books.map((bookItem, index) => {
                                                return <MediaBox key={"src" + index} type="appmsg" href={bookItem.url}>
                                                    <MediaBoxHeader>
                                                        <div style={{
                                                            width: '120px',
                                                            height: '65px'
                                                        }}>
                                                            <img src={bookItem.title_pic} alt="课本" style={{
                                                                width: '100%',
                                                                height: '100%'
                                                            }}/>
                                                        </div>

                                                    </MediaBoxHeader>
                                                    <MediaBoxBody>
                                                        <MediaBoxTitle>{bookItem.name}</MediaBoxTitle>
                                                        <MediaBoxDescription>
                                                            {bookItem.banben}
                                                        </MediaBoxDescription>
                                                    </MediaBoxBody>
                                                </MediaBox>
                                            })}
                                        </PanelBody>
                                    </Panel>
                                </div>
                            })}
                    </TabBody>
                </Tab>
            </div>
        );
    }
}

export default App;
