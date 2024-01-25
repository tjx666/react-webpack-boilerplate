import { Button } from 'antd';
import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    const increase = () => {
        setCount(count + 1);
    };
    const double = () => {
        setCount(count * 2);
    };

    return (
        <div className="mx-auto mt-16 flex w-40 flex-col items-center justify-center">
            <h3 className="text-center font-bold">{count}</h3>
            <div className="operations">
                <Button className="mr-3 mt-5" onClick={increase}>
                    +1
                </Button>
                <Button onClick={double}>x2</Button>
            </div>
        </div>
    );
}
