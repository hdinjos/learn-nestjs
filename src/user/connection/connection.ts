import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class Connection {
  getName(): string {
    return null;
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return "MySQL";
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return "MongoDB";
  }
}

//factory method/provider factory
export function createConnection(configService: ConfigService): Connection {
  if (configService.get("DB") === "mysql") {
    return new MySQLConnection();
  } else {
    return new MongoDBConnection();
  }
}
