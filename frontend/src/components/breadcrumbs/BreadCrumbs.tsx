import * as React from 'react';

interface Props {
    breadCrumbs: string[];
    linkClick;
}

const BreadCrumbs = (props: Props) => {
    const breadCrumbs = props.breadCrumbs || [];
    const { linkClick } = props;

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadCrumbs.map((e, i) => (
                        <li className="breadcrumb-item" key={i}><a onClick={() => linkClick(breadCrumbs, i)}>{e}</a></li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default BreadCrumbs;