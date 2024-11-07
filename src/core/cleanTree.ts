const isHTMLElement = (node: unknown): node is HTMLElement => !!(node as HTMLElement).style;

const cleanElement = (node: Element | HTMLElement) => {
    if (isHTMLElement(node)) {
        node.removeAttribute('class');
        node.removeAttribute('align');
        node.removeAttribute('style');
    }

    if (
        node.tagName.toLowerCase() === 'img' ||
        node.tagName.toLowerCase() === 'image' ||
        node.tagName.toLowerCase() === 'svg'
    ) {
        node.parentNode?.removeChild(node);
    }

    if (node.childNodes.length) {
        for (const child of node.children) {
            cleanElement(child);
        }
    }
};

const cleanTree = (html: string) => {
    let current: Element = document.createElement('div');
    current.innerHTML = html;

    // Linkedin
    current.querySelector('.job-details-jobs-unified-top-card__top-buttons')?.remove();
    current.querySelector('.job-details-jobs-unified-top-card__job-title-badge')?.remove();

    while (current && current.children.length === 1) {
        const next = current.children[0];
        current.replaceWith(next);
        current = next;
    }

    let didReplace = false;

    do {
        didReplace = false;
        for (const currentNode of Array.from(current.children)) {
            if (currentNode.tagName.toLowerCase() === 'div') {
                currentNode.replaceWith(...currentNode.children);
                didReplace = true;
            }
        }
    } while (didReplace);

    for (const currentNode of current.children) {
        if (
            currentNode.tagName.toLowerCase() === 'img' ||
            currentNode.tagName.toLowerCase() === 'image' ||
            currentNode.tagName.toLowerCase() === 'svg'
        ) {
            currentNode.parentNode?.removeChild(currentNode);
            for (const attribute of currentNode.attributes) {
                // if (attribute.name.toLowerCase() !== 'src') {
                currentNode.removeAttribute(attribute.name);
                // }
            }
        }
    }

    cleanElement(current);

    for (const currentNode of Array.from(current.children)) {
        if (currentNode.tagName.toLowerCase() !== 'img') {
            const content = currentNode.innerHTML.toLowerCase().trim();
            if (
                content === '<br />' ||
                content === '<p><br /></p>' ||
                content === '<br>' ||
                content === '<p><br></p>' ||
                content === '<br><br>' ||
                content === ''
            ) {
                // current.removeChild(currentNode);
                currentNode.remove();
            } else {
                // console.log(content, content === '<br />' || content === '<br>');
            }
        }
    }

    return current.innerHTML;
};

export default cleanTree;