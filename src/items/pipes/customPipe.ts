import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("value:");
    console.log(value);
    console.log("metadata");
    console.log(metadata);
    return value;
  }
}