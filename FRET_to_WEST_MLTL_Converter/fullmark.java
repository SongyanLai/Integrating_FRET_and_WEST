import java.util.Arrays;

public class MergeSort {
    public static void main(String[] args) {
        int[] array = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(array);
        System.out.println(Arrays.toString(array)); // Print sorted array
    }

    // Merge sort main function
    public static void mergeSort(int[] array) {
        if (array.length < 2) return; // No need to sort if array has less than 2 elements

        // Split array into two halves
        int mid = array.length / 2;
        int[] left = Arrays.copyOfRange(array, 0, mid);
        int[] right = Arrays.copyOfRange(array, mid, array.length);

        // Recursively sort both halves
        mergeSort(left);
        mergeSort(right);

        // Merge the sorted halves
        merge(array, left, right);
    }

    // Merge two sorted arrays
    public static void merge(int[] array, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;

        // Merge left and right arrays
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
        }

        // Copy remaining elements of left array
        while (i < left.length) {
            array[k++] = left[i++];
        }

        // Copy remaining elements of right array
        while (j < right.length) {
            array[k++] = right[j++];
        }
    }
}


public static void quickSort(int[] array, int left, int right) { 
    if (left > right) { 
        return; // Base case
    } 
    int base = array[left]; // Pivot
    int i = left;
    int j = right;
    while (i != j) {
        while (array[j] >= base && i < j) { 
            j--; // Move j left
        } 
        while (array[i] <= base && i < j) { 
            i++; // Move i right
        } 
        int temp = array[i]; // Swap array[i] and array[j]
        array[i] = array[j]; 
        array[j] = temp;
    }
    array[left] = array[i]; // Place pivot
    array[i] = base;
    quickSort(array, left, i - 1); // Sort left part
    quickSort(array, i + 1, right); // Sort right part
}

Public class Queue{
    private int[] Queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    public Queue(int capacity) {
        this.capacity = capacity;
        queue = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    public void enqueue(int data) {
        if (isFull()) {
            System.out.println("Queue is full");
            return;
        }
        rear = (rear + 1) % capacity;
        queue[rear] = data;
        size++;
    }   

    public int dequeue() {        
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        int data = queue[front];
        front = (front + 1) % capacity;
        size--;
        return data;
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return queue[front];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }
    
    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return;
        } 
        For(int i=0; i<size; i++){
            System.out.print(queue[(i+front)%capacity] + " ");
        }
    
}

for(int i=0; i<arr.length; i++){
    for(int j=i+1; j>0 && arr[j]<arr[j-1]; j--){
        int temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
}
}

public static void mergeSort(int[] array) {
    if (array.length < 2) return; 

    int mid = array.length / 2;
    int