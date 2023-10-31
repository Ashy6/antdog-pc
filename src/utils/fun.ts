/**
 * 这里存放一些业务相关的普通方法
 */

export function convertTimeString(str: string): { date: string; time: string } {
    const [date, time] = str.split(' ')
    return { date, time }
}

export function getImageList(images: string) {
    return images.split(',')
}