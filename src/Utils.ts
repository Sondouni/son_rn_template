import { Dimensions } from "react-native";
import { ClipOp, createPicture, rect, Skia, SkImage, SkPicture } from "@shopify/react-native-skia";


export const DEFAULT_BACKGROUND_COLOR = "#FFFFFF";


export const getWidth = () => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  // if(deviceWidth*1.25>=deviceHeight){
  //     return Dimensions.get('window').width*0.85;
  // }else {
  //     return Dimensions.get('window').width;
  // }
  return Dimensions.get("window").width;

};

export const getHeight = () => {
  return Dimensions.get("window").height;
};

export const getDay = (dayNum, kor) => {
  let day = "";
  switch (dayNum) {
    case 0:
      if (kor) {
        day = "일";
      } else {
        day = "Sun";
      }
      break;
    case 1:
      if (kor) {
        day = "월";
      } else {
        day = "Mon";
      }
      break;
    case 2:
      if (kor) {
        day = "화";
      } else {
        day = "Tue";
      }
      break;
    case 3:
      if (kor) {
        day = "수";
      } else {
        day = "Wed";
      }
      break;
    case 4:
      if (kor) {
        day = "목";
      } else {
        day = "Thu";
      }
      break;
    case 5:
      if (kor) {
        day = "금";
      } else {
        day = "Fri";
      }
      break;
    case 6:
      if (kor) {
        day = "토";
      } else {
        day = "Sat";
      }
      break;
  }
  return day;
};

export const getMonth = (monthNum) => {
  let month = "";
  switch (monthNum) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }
  return month;
};

export const isSameDate = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
};


type IParticle = {
  x: number;
  y: number;
  savedX: number;
  savedY: number;
  vx: number;
  vy: number;
  picture: SkPicture;
  isShow: boolean;
}

export const makeImageParticles = (image: SkImage, density: number, size: number, stageWidth: number, stageHeight: number,changeP = false) => {
  const result: IParticle[] = [];
  const paint = Skia.Paint();
  paint.setColor(Skia.Color('Pink'))

  for (let x = 0; x < stageWidth; x += density) {
    for (let y = 0; y < stageHeight; y += density) {
      const picture = createPicture(rect(0, 0, density, density), canvas => {
        canvas.translate(-x, -y);

        const clipPath = Skia.Path.Make();
        // clipPath.addCircle(x, y, size);
        if(changeP){
          clipPath.addRect({x: x, y: y, width: size, height: size},true);
        }else {
          clipPath.addRect({x: x, y: y, width: density, height: density},true);
        }

        canvas.clipPath(clipPath, ClipOp.Intersect, true);
        // console.log(image.width(),image.height(),'image');
        // console.log(stageWidth,stageHeight,'divice');
        if(changeP){
          if(y%2==0 && x%2 ==0){
            // if(true){
            canvas.drawRect(
              {
                x,y,width:size,height:size
              },
              paint
              // canvas.drawImageRect(
              //   image,
              //   rect(0, 0, image.width(), image.height()),
              //   rect(0, 0, stageWidth, stageHeight),
              //   paint,
            );
          }else if(x%2==1 && y%2==1){{
            canvas.drawRect(
              {
                x,y,width:size,height:size
              },
              paint
              // canvas.drawImageRect(
              //   image,
              //   rect(0, 0, image.width(), image.height()),
              //   rect(0, 0, stageWidth, stageHeight),
              //   paint,
            );
          }}
        }else {
          // canvas.drawRect(
          //   {
          //     x,y,width:size,height:size
          //   },
          //   paint
            canvas.drawImageRect(
              image,
              rect(0, 0, image.width(), image.height()),
              rect(0, 0, stageWidth, stageHeight),
              paint,
          );
        }



      });
      result.push({
        x: x,
        y: y,
        savedX: x,
        savedY: y,
        vx: 0,
        vy: 0,
        picture,
        isShow:true
      });
    }
  }
  return result;
};


export const makePicture = (x,y,image: SkImage, density: number, size: number, stageWidth: number, stageHeight: number,changeP = false) => {
  const paint = Skia.Paint();
  paint.setColor(Skia.Color('Pink'))

  const picture = createPicture(rect(0, 0, density, density), canvas => {
    canvas.translate(-x, -y);

    const clipPath = Skia.Path.Make();
    // clipPath.addCircle(x, y, size);
    if(changeP){
      clipPath.addRect({x: x, y: y, width: size, height: size},true);
    }else {
      clipPath.addRect({x: x, y: y, width: density, height: density},true);
    }

    canvas.clipPath(clipPath, ClipOp.Intersect, true);
    // console.log(image.width(),image.height(),'image');
    // console.log(stageWidth,stageHeight,'divice');
    if(changeP){
      if(y%2==0 && x%2 ==0){
        // if(true){
        canvas.drawRect(
          {
            x,y,width:size,height:size
          },
          paint
          // canvas.drawImageRect(
          //   image,
          //   rect(0, 0, image.width(), image.height()),
          //   rect(0, 0, stageWidth, stageHeight),
          //   paint,
        );
      }else if(x%2==1 && y%2==1){{
        canvas.drawRect(
          {
            x,y,width:size,height:size
          },
          paint
          // canvas.drawImageRect(
          //   image,
          //   rect(0, 0, image.width(), image.height()),
          //   rect(0, 0, stageWidth, stageHeight),
          //   paint,
        );
      }}
    }else {
      // canvas.drawRect(
      //   {
      //     x,y,width:size,height:size
      //   },
      //   paint
      canvas.drawImageRect(
        image,
        rect(0, 0, image.width(), image.height()),
        rect(0, 0, stageWidth, stageHeight),
        paint,
      );
    }



  });
}
