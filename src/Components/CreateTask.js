import React, { Component } from 'react'
import ListTask from './ListTask'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faComment } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faComment);

export class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            currentTask: {
                text: '',
                key: ''
            },
            isEdit: false,
            
        }

        this.inputOnFocus = React.createRef();
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
    };

    handleChange = (e) => {
        this.setState({
            currentTask: {
                text: e.target.value,
                key: Math.random()
            }
        })
    }

    addTask = (e) => {
        e.preventDefault();
        const task = this.state.currentTask;
        if (task.text !== "") {
            const newtasks = [...this.state.tasks, task];
            this.setState({
                tasks: newtasks,
                currentTask: {
                    text: '',
                    key: ''
                }
            })
        }
    }

    deleteTask = (key) => {
        const filteredTask = this.state.tasks.filter(item => item.key !== key);
        this.setState({
            tasks: filteredTask
        })
    }

    editTask = (text, key) => {
        const tasks = this.state.tasks;
        tasks.map(item => {
            if(item.key === key){
                item.text = text;
            }
        })
        this.setState({
            tasks: tasks
        })
    }

    componentDidMount = () => {
        this.inputOnFocus.current.focus();
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.addTask}>
                    <input className="input"
                        ref={this.inputOnFocus}
                        type="text"
                        placeholder="Enter to create task"
                        value={this.state.currentTask.text}
                        onChange={this.handleChange}
                    />
                    <button className="btn-add" type="submit">Add</button>
                </form>
                <ListTask
                    tasks={this.state.tasks}
                    deleteTask={this.deleteTask}
                    editTask={this.editTask}
                />
            </React.Fragment>
        )
    }
}



export default CreateTask;
