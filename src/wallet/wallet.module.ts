import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Wallet, WalletSchema } from "./models";
import { WalletService } from "./services";


@Module({
    imports:[MongooseModule.forFeature([{name:Wallet.name,schema:WalletSchema}])],
    controllers:[],
    providers:[WalletService],
    exports:[WalletService]
})
export class WalletModule {}